const size = {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
}

Object.keys(size).forEach((key: string) => size[key as keyof typeof size] = `@media (min-width: ${size[key as keyof typeof size]})`)

export default size

