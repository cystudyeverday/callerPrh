'use client';
import React, { ReactNode } from 'react'
import { Flex, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
interface Props {
    children: ReactNode
}
const layout = ({ children }: Props) => {
    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        height: 64,
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: '#4096ff',
    };
    const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        height: 'calc(100vh - 64px)',
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: 'white'
    };
    return (
        <Layout >
            <Header style={headerStyle}>Header</Header>
            <Content style={contentStyle} >
                {children}
            </Content>
        </Layout>
    )
}

export default layout;