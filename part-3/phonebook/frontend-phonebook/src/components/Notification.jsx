const Notification = ({ message, type }) => {
  if (!message) return null

  const baseStyle = {
    fontSize: 16,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    border: '2px solid',
  }

  const styles = {
    success: {
      ...baseStyle,
      color: 'green',
      background: '#ddffdd',
      borderColor: 'green',
    },
    error: {
      ...baseStyle,
      color: 'red',
      background: '#ffdddd',
      borderColor: 'red',
    },
  }

  return <div style={styles[type]}>{message}</div>
}

export default Notification
