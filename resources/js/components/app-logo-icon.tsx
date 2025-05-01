import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return <img src="/images/logo.jpeg" alt="Logo Yanbu'ul Ulum" {...props} />;
}
