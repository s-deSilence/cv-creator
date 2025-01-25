import { FC, useMemo, useEffect } from "react";
import { Row, Input, Col, Slider } from "antd";
import { useFieldArray } from "react-hook-form";
import { useForm } from "react-hook-form";
import { defaultFormData, setLanguages } from "../store/slices";
import { useDispatch } from "react-redux";
import { DeleteOutlined} from "@ant-design/icons";
import { FormItem } from "react-hook-form-antd";
import { useDebouncedCallback } from "use-debounce";
import { CardBlock } from "../Card";

export const LanguagesForm:FC = () => {

    const { watch, control } = useForm({
        defaultValues: {
            languages: defaultFormData.languages
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "languages",
    });

    const dispatch = useDispatch()

    const values = watch("languages");

    const debounced = useDebouncedCallback((values) => {
            dispatch(setLanguages(values))
        }, 3000)
    
    useEffect(() => {
        if( values ){
            debounced(values);
        }
    }, [JSON.stringify(values)])

    const collapseItems = useMemo(() => {
        return fields.map((field, index) => ({
            key: field.id,
            label: `${values[index].lang || 'Untitled'}`,
            extra: <DeleteOutlined onClick={() => remove(index)}/>,
            children:   <Row gutter={[16, 16]} key={field.id}>
                            <Col span={12}>
                                <FormItem control={control} name={`languages.${index}.lang`} label={"Language"}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem control={control} name={`languages.${index}.levelDesc`} label={"Level Description"}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={2} />
                            <Col span={20}>
                                <FormItem control={control} name={`languages.${index}.level`} label={"Level"}>
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

    return <CardBlock 
                title="Languages"
                collapseItems={collapseItems}
                onAppend={() => append({ lang: "", level: 0, levelDesc: "" })}
            />
}