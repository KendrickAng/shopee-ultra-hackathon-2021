const Container = (props) => {
    const styles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
    return (
        <div style={styles}>
            {props.children}
        </div>
    )
}

export { Container };