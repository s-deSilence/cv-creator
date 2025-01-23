import { Row, Input, Col, Card, Upload,UploadProps } from "antd";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import { useDispatch } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce';
import { defaultFormData, setMainInfo } from "../store/slices";
import { LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import { beforeUpload } from "../utils/beforeUpload";
import { getBase64 } from "../utils/getBase64";
import { FileType } from "../utils/beforeUpload";

export const PersonalInfoForm:FC = () => {

    const [ loading, setLoading ] = useState(false)

    const { watch, control, setValue } = useForm({
        defaultValues: {
            main: defaultFormData.main
        }
    });

    const dispatch = useDispatch()

    const values = watch("main");
    const imgUrl = watch("main.photo");

    const debounced = useDebouncedCallback((values) => {
        dispatch(setMainInfo(values))
    }, 3000)

    useEffect(() => {
        debounced(values);
    }, [JSON.stringify(values)])

    const handleChange: UploadProps['onChange'] = (info) => {
        if( info.file ){
            setLoading( true );
            getBase64(info.file as FileType, (url) => {
                setLoading(false);
                setValue("main.photo", url)
            });
        }
        
      };

    return (
        <div style={{ marginBottom: '16px'}}>
            <Card title="Personal Info" bordered={false}>
                
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <FormItem control={control} name="main.jobTitle" label={"Job title"}>
                            <Input />
                        </FormItem>
                        <FormItem control={control} name="main.firstName" label={"First Name"}>
                            <Input />
                        </FormItem>
                        <FormItem control={control} name="main.lastName" label={"Last Name"}>
                            <Input />
                        </FormItem>
                        <FormItem control={control} name="main.email" label={"Email"}>
                            <Input />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <div style={{ textAlign:'center', paddingTop:'32px', paddingBottom: '38px'}}>
                            <Upload 
                                name="avatar" 
                                listType={"picture-circle"} 
                                showUploadList={false} 
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {
                                    imgUrl 
                                        ?   <img src={imgUrl} alt="avatar" style={{ width: '100%', borderRadius:'50%' }} />
                                        :   <button type="button" style={{ border:'none', background:'none'}}>
                                                { loading ? <LoadingOutlined /> : <PlusOutlined /> }
                                                <div style={{ marginTop:'8px'}}>{"Upload"}</div>
                                            </button>
                                }
                            </Upload>
                        </div>
                        
                        <FormItem control={control} name="main.phone" label={"Phone"}>
                            <Input />
                        </FormItem>
                        <FormItem control={control} name="main.city" label={"City"}>
                            <Input />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <FormItem control={control} name="main.summary" label={"Proffessional Summary"}>
                            <Input.TextArea rows={5} />
                        </FormItem>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}