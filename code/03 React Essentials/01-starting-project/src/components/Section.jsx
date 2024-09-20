// first usage of '...props':
// 'title' and 'children' will be receifed specifically
// while all other props will be collected into 'props'

// second usage of '...props':
// JSX spread attributes, meaning that all extra props that were not explicitly extracted
// will be passed down / forwarded to the receiving 'section'-tag.

export default function Section({title, children, ...props}) {
    return (
        <section {...props}>
            <h1>{title}</h1>
            {children}
        </section>
    );
}