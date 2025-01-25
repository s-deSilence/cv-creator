import { Row, Input, Col } from "antd";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import { useDispatch } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce';
import { defaultFormData, setLinks} from "../store/slices";
import { CardBlock } from "../Card";

export const LinksForm:FC = () => {

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
        <CardBlock title="Links" >
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
        </CardBlock>
    )

}