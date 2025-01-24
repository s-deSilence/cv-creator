import { FC, useEffect, useMemo } from "react";
import { Row, Input, Col, Button, Card, Collapse } from "antd";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import { useDispatch } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce';
import { defaultFormData, setEducation } from "../store/slices";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

export const EducationForm:FC = () => {

    const { watch, control } = useForm({
        defaultValues: {
            education: defaultFormData.education
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "education",
      });

    const dispatch = useDispatch()

    const values = watch("education");

    const debounced = useDebouncedCallback((values) => {
        dispatch(setEducation(values))
    }, 3000)

    useEffect(() => {
        if( values ){
            debounced(values);
        }
    }, [JSON.stringify(values)])

    const collapseItems = useMemo(() => {
            return fields.map((field, index) => ({
                key: field.id,
                label: `${values[index].degree || 'Untitled'}`,
                extra: <DeleteOutlined onClick={() => remove(index)}/>,
                children: <Row gutter={[16, 16]} key={field.id}>
                            <Col span={12}>
                                <FormItem control={control} name={`education.${index}.title`} label={"Title"}>
                                    <Input />
                                </FormItem>
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <FormItem control={control} name={`education.${index}.startDate`} label={"Start Date"}>
                                            <Input />
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem control={control} name={`education.${index}.endDate`} label={"End Date"}>
                                            <Input />
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <FormItem control={control} name={`education.${index}.degree`} label={"Degree"}>
                                    <Input />
                                </FormItem>
                                <FormItem control={control} name={`education.${index}.city`} label={"City"}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem control={control} name={`education.${index}.description`} label={"Description"}>
                                    <Input.TextArea rows={5} />
                                </FormItem>
                            </Col>
                        </Row>
            }))
        }, [fields, JSON.stringify(values)])

    return (
        <div className="form-block">
            <Card title="Education" bordered={false}>
                <Collapse 
                    items={collapseItems}
                    bordered={false}
                />
                <div className="form-button_add-wrapper">
                    <Button 
                        onClick={() => append({ city:"", description:"", title: "", degree:"", startDate:"", endDate:"" })}
                        className="form-button_add"
                        icon={<PlusOutlined />}
                    >Add</Button>
                </div>
                
            </Card>
            
        </div>
    )
}