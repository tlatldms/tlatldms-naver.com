import React, { useEffect } from "react";
import OrderComp from "./OrderComp";
import { Client } from "@stomp/stompjs";
import Modal from "react-modal";
import Popup from "./Popup";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
Modal.setAppElement(document.getElementById("forModal"));
const ip = "ws://localhost:8080";
const Search = ({ location }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  let conn = null;

  useEffect(() => {
    conn = new Client();
    conn.configure({
      brokerURL: `${ip}/wscn/websocket`,
      onConnect: e => {
        console.log("connect success! \n" + e);
        conn.subscribe(`/topic/2`, message => {
          console.log(message);
          var datas = JSON.parse(message.body);
          setIsOpen(true);
        });
      },
      onDisconnect: e => {
        console.log("disconnected");
      },

      // Helps during debugging, remove in production
      debug: str => {
        console.log(new Date(), str);
      }
    });

    conn.activate();
  }, []);

  return (
    <div>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        {/* <button onClick={closeModal}>close</button> */}
        <Popup />
      </Modal>

      {/* {new URLSearchParams(location.search).get("keyword")} 검색 */}
      <div class="limiter">
        <div class="container-table100">
          <div class="wrap-table100">
            <div class="table">
              <div class="row header">
                <div class="cell">Full Name</div>
                <div class="cell">Age</div>
                <div class="cell">Job Title</div>
                <div class="cell">Location</div>
              </div>
              <OrderComp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
