import { Row, Input, Col, Card } from "antd";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import { useDispatch } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce';
import { defaultFormData, setLinks} from "../store/slices";

export const LinksForm:FC = () => {

    const [ loading, setLoading ] = useState(false)

    const { watch, control, setValue } = useForm({
        defaultValues: {
            links: defaultFormData.links
        }
    });

    const dispatch = useDispatch()

    const values = watch("links");

    const debounced = useDebouncedCallback((values) => {
        dispatch(setLinks(values))
    }, 3000)

    useEffect(() => {
        debounced(values);
    }, [JSON.stringify(values)])

    return (
        <div style={{ marginBottom: '16px'}}>
            <Card title="Links" bordered={false}>
                
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <FormItem control={control} name="links.telegram" label={"Telegram"}>
                            <Input />
                        </FormItem>
                        <FormItem control={control} name="links.linkedin" label={"LinkedIn"}>
                            <Input />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem control={control} name="links.github" label={"GitHub"}>
                            <Input />
                        </FormItem>
                    </Col>
                </Row>

            </Card>
        </div>
    )
}