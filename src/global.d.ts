declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

declare module '*png'
declare module '*jpg'
declare module '*jpeg'
declare module '*.svg' {
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const content: string;

    export { ReactComponent };
    export default content;
}

declare const __PLATFROM__: 'mobile' | 'desktop'
