import './globals.css'
import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata: Metadata = {
  title: "sytem",
  description: "Caller system",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html suppressHydrationWarning={true} lang="en" data-scroll="0">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
      </head>
      <body>
        <div id="ocbc-root">
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </div>
      </body>
    </html>
  );
}
