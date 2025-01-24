import { FC, useMemo, useEffect } from "react";
import { Row, Input, Col, Button, Card, Collapse, Slider } from "antd";
import { useFieldArray } from "react-hook-form";
import { useForm } from "react-hook-form";
import { defaultFormData, setSkills } from "../store/slices";
import { useDispatch } from "react-redux";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { FormItem } from "react-hook-form-antd";
import { useDebouncedCallback } from "use-debounce";

export const SkillsForm:FC = () => {

    const { watch, control } = useForm({
        defaultValues: {
            skills: defaultFormData.skills
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "skills",
    });

    const dispatch = useDispatch()

    const values = watch("skills");

    const debounced = useDebouncedCallback((values) => {
        dispatch(setSkills(values))
    }, 3000)
        
    useEffect(() => {
        if( values ){
            debounced(values);
        }
    }, [JSON.stringify(values)])

    const collapseItems = useMemo(() => {
        return fields.map((field, index) => ({
            key: field.id,
            label: `${values[index].name || 'Untitled'}`,
            extra: <DeleteOutlined onClick={() => remove(index)}/>,
            children:   <Row gutter={[16, 16]} key={field.id}>
                            <Col span={12}>
                                <FormItem control={control} name={`skills.${index}.name`} label={"Skill name"}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem control={control} name={`skills.${index}.exp`} label={"Experience"}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={2} />
                            <Col span={20}>
                                <FormItem control={control} name={`skills.${index}.level`} label={"Level"}>
                                    <Slider 
                                        marks={{ 0: 'Bad', 1: 'Not bad', 2: 'Norm', 3: 'Good', 4: 'Excellent'}} 
                                        max={4}
                                        min={0}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={2} />
                        </Row>
        }))
    }, [fields, JSON.stringify(values)])

    return (
        <div className="form-block">
            <Card title="Skills" bordered={false}>
                <Collapse 
                    items={collapseItems}
                    bordered={false}
                />
                <div className="form-button_add-wrapper">
                    <Button 
                        onClick={() => append({ name: "", level: 0, exp: "" })}
                        className="form-button_add"
                        icon={<PlusOutlined />}
                    >Add</Button>
                </div>
            </Card>
        </div>
    )
}