const Error = ({message}) => {
  return (
    <div>
        <h1
        style={{
            border:'2px solid red',
            color:"red",
            borderRadius:'25px',
          padding:'10px',
          background:'#9b9696e7'
        }}
        > 
        {message} </h1>

    </div>
  )
}

export default Error