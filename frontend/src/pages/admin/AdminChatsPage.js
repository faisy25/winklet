import { Row, Col } from "react-bootstrap";
import AdminLinksComponent from "../../componenets/admin/AdminLinksComponent";
import AdminChatRoomComponent from "../../componenets/admin/AdminChatRoomComponent";
import { useSelector } from "react-redux";

const AdminChatsPage = () => {
  const { chatRooms, socket } = useSelector((state) => state.adminChat);

  return (
    <>
      <Row className="m-5">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <Row>
            {Object.entries(chatRooms).map((chatRoom, index) => (
              <AdminChatRoomComponent
                key={index}
                chatRoom={chatRoom}
                roomIndex={index + 1}
                socket={socket}
                socketUser={chatRoom[0]}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default AdminChatsPage;
