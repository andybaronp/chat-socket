
import './App.css'
import io from 'socket.io-client'
import Chat from './components/Chat'
import { useState } from 'react'
import { Container, Card, Form, Button } from 'semantic-ui-react'

const socket = io.connect('http://localhost:3003')
function App() {
  const [userName, seTUserName] = useState("")
  const [roomName, seTRoomName] = useState("")
  const [showChat, setShowtChat] = useState(false)
  const joinRoom = () => {
    if (userName !== "" && roomName !== "") {
      socket.emit("join_room", roomName)
      setShowtChat(true)
    }
  }

  return (
    <Container >
      {

        showChat ?
          <Chat socket={socket} userName={userName} roomName={roomName} />
          :
          <Card fluid>
            <Card.Content header='Unirme al cha' />
            <Card.Content description='Unirme al chat' />
            <Card.Content extra>
              <Form onSubmit={joinRoom}>
                <Form.Field onChange={(event) => seTUserName(event.target.value)}>
                  <label>Nombre</label>
                  <input placeholder='Nombre' />
                </Form.Field>
                <Form.Field onChange={(event) => seTRoomName(event.target.value)} >
                  <label>Sala</label>
                  <input placeholder='Id sala' />
                </Form.Field>
                <Button type='submit'>Unirse</Button>
              </Form>
            </Card.Content>
          </Card>
      }
    </Container>
  )
}

export default App
