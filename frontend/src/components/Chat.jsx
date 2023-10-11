import { useState, useEffect } from 'react'
import { Card, Button, Form, Message, Divider } from 'semantic-ui-react';

const Chat = ({ socket, userName, roomName }) => {
  const [message, setMessage] = useState("");
  const [listMessages, setListMessages] = useState([]);
  const sendMessage = async () => {
    if (userName && message) {
      let info = {
        userName,
        roomName,
        message: message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }

      await socket.emit("send_message", info)
      setListMessages(prev => [...prev, info])
    }
    setMessage('')
  }

  useEffect(() => {
    const messageHandler = (data) => {
      setListMessages(prev => [...prev, data])
    }
    socket.on("receive_message", messageHandler)

    return () => {
      socket.off("receive_message", messageHandler)
    }
  }
    , [socket])


  return (
    <Card fluid>
      <Card.Content header={`Chat |  Sala ${roomName}`} />
      <Card.Content style={{
        minHeight: "300px",

      }}>

        {listMessages.map((message, index) => {
          return (
            <span key={index} style={{ textAlign: userName === message.userName ? 'right' : 'left' }}>
              <Message info={userName !== message.userName} success={userName === message.userName} size='small'    >
                <Message.Header> {message.message}</Message.Header>
                <Message.Content>Enviado por: <strong>{message.userName.toUpperCase()}</strong>  |  <i>{message.time}</i></Message.Content>

              </Message>
              <Divider />
            </span>
          )
        })}


      </Card.Content>
      <Card.Content extra>

        <Form onSubmit={sendMessage}>
          <Form.Field onChange={e => setMessage(e.target.value)} >
            <label>Mensaje</label>
            <input placeholder='Nombre' />
          </Form.Field>
          <Button type='submit' primary  >Enviar &#9658;</Button>
        </Form>
      </Card.Content>
    </Card>

  )
}

export default Chat