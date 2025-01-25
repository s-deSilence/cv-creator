import { FC, ReactNode } from "react";
import { Card, CollapseProps, Collapse, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type CardBlockProps = {
    title: string,
    collapseItems?: CollapseProps['items'],
    onAppend?: () => void,
    children?: ReactNode
}

export const CardBlock:FC<CardBlockProps> = ({ title, collapseItems, onAppend, children }) => {

    return (
        <div className="form-block">
            <Card title={title} bordered={false}>
                { children }
                { collapseItems && (
                    <Collapse 
                        items={collapseItems}
                        bordered={false}
                    />
                )}
                { onAppend && (
                    <div className="form-button_add-wrapper">
                        <Button 
                            onClick={onAppend}
                            className="form-button_add"
                            icon={<PlusOutlined />}
                        >Add</Button>
                    </div>
                )}
            </Card>
        </div>
    )
}