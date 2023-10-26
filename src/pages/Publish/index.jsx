import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select, message,

} from 'antd'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import {PlusOutlined} from '@ant-design/icons'
import {Link, useSearchParams} from 'react-router-dom'
import './index.scss'
import {useEffect, useState} from "react";
import {createArticleAPI, getArticleById, updateArticleAPI} from "@/apis/article.js";
import {useChannel} from "@/hooks/useChannel.js";

const {Option} = Select

const Publish = () => {
    const [searchParams] = useSearchParams();
    const [imageList, setImageList] = useState([])
    const {channelList} = useChannel();
    const articleId = searchParams.get('id')
    const onFinish = (formValue) => {
        console.log(formValue)
        const {title, content, channel_id} = formValue
        if (imageList.length !== imageType) return message.warning('封面类型和图片数量不匹配')
        const reqData = {
            title,
            content,
            cover: {
                type: imageType, // 封面模式
                // 这里的url处理逻辑只是在新增时候的逻辑
                // 编辑的时候需要做处理
                images: imageList.map(item => {
                    if (item.response) {
                        return item.response.data.url
                    } else {
                        return item.url
                    }
                }) // 图片列表
            },
            channel_id
        }
        if (articleId){
            updateArticleAPI({...reqData,id:articleId})
        }else {
            createArticleAPI(reqData)
        }

    }
    const onChange = (value) => {
        console.log('正在上传。。。。')
        setImageList(value.fileList)
    }

    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        console.log('change')
        setImageType(e.target.value)
    }
    const [form] = Form.useForm();
    useEffect(() => {
        async function getArticleDetail() {
            const res = await getArticleById(articleId);
            form.setFieldsValue({
                ...res.data,
                type: res.data.cover.type
            })
            setImageType(res.data.cover.type)
            setImageList(res.data.cover.images.map(url => {
                return {url}
            }))
        }
        if (articleId){
            getArticleDetail()
        }

    }, [articleId, form]);
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: `${articleId?'编辑':'发布'}文章`},
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 16}}
                    initialValues={{type: 0}}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{required: true, message: '请输入文章标题'}]}
                    >
                        <Input placeholder="请输入文章标题" style={{width: 400}}/>
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{required: true, message: '请选择文章频道'}]}
                    >
                        <Select placeholder="请选择文章频道" style={{width: 400}}>
                            {channelList.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/*
              listType: 决定选择文件框的外观样式
              showUploadList: 控制显示上传列表
            */}
                        {imageType !== 0 && <Upload
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            name='image'
                            maxCount={imageType}
                            onChange={onChange}
                            fileList={imageList}
                        >
                            <div style={{marginTop: 8}}>
                                <PlusOutlined/>
                            </div>
                        </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{required: true, message: '请输入文章内容'}]}
                    >
                        <ReactQuill
                            placeholder={'请输入文章内容'}
                            theme={'snow'}
                            className='publish-quill'

                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 4}}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish