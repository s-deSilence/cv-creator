import { FC, useEffect, useMemo } from "react";
import { Row, Input,Col } from "antd";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import { useDispatch } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce';
import { defaultFormData, setEmployments } from "../store/slices";
import { DeleteOutlined, } from "@ant-design/icons";
import { CardBlock } from "../Card";

export const EmploymentHistoryForm:FC = () => {

    const { watch, control } = useForm({
        defaultValues: {
            employments: defaultFormData.employments
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "employments",
      });

    const dispatch = useDispatch()

    const values = watch("employments");

    const debounced = useDebouncedCallback((values) => {
        dispatch(setEmployments(values))
    }, 3000)

    useEffect(() => {
        if( values ){
            debounced(values);
        }
    }, [values])

    const collapseItems = useMemo(() => {
        return fields.map((field, index) => ({
            key: field.id,
            label: `${values[index].title || 'Untitled'}`,
            extra: <DeleteOutlined onClick={() => remove(index)}/>,
            children: <Row gutter={[16, 16]} key={field.id}>
                        <Col span={12}>
                            <FormItem control={control} name={`employments.${index}.title`} label={"Title"}>
                                <Input />
                            </FormItem>
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <FormItem control={control} name={`employments.${index}.startDate`} label={"Start Date"}>
                                        <Input />
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem control={control} name={`employments.${index}.endDate`} label={"End Date"}>
                                        <Input />
                                    </FormItem>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <FormItem control={control} name={`employments.${index}.employer`} label={"Employer"}>
                                <Input />
                            </FormItem>
                            <FormItem control={control} name={`employments.${index}.city`} label={"City"}>
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem control={control} name={`employments.${index}.description`} label={"Description"}>
                                <Input.TextArea rows={5} />
                            </FormItem>
                        </Col>
                    </Row>
        }))
    }, [fields, JSON.stringify(values)])

    return <CardBlock 
                title="Employment History"
                collapseItems={collapseItems}
                onAppend={() => append({ city:"", description:"", title: "", employer:"", startDate:"", endDate:"" })}
            />
}