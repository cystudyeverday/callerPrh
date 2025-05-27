'use client';
import React, { ReactNode } from 'react'
import { Flex, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
interface Props {
    children: ReactNode
}
const layout = ({ children }: Props) => {
    const headerStyle: React.CSSProperties = {
        textAlign: 'left',
        color: '#fff',
        height: 64,
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: '#4096ff',
        fontSize: 24
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
            <Header style={headerStyle}>Caller System </Header>
            <Content style={contentStyle} >
                {children}
            </Content>
        </Layout>
    )
}

export default layout;