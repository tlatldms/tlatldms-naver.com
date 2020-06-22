import React, { useEffect } from "react";
import OrderComp from "./OrderComp";
import { Client } from "@stomp/stompjs";
import Modal from "react-modal";
import Popup from "./Popup";
import Axios from "axios";

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
const ip = "ws://54.180.99.61:8080";
const Search = ({ location }) => {
  const [nowOrder, setNowOrder] = React.useState();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [Orders, setOrders] = React.useState();
  const [exam, setexam] = React.useState(1);
  const getOrders = async () => {
    const URL = "http://54.180.99.61:8080/order/2";
    try {
      const data = await Axios.get(URL).then(res => res.data);
      setOrders(data.store);
      //console.log(data.store);
    } catch (error) {
      console.log(error);
    }
  };

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
    getOrders();
    conn = new Client();
    conn.configure({
      brokerURL: `${ip}/wscn/websocket`,
      onConnect: e => {
        //console.log("connect success! \n" + e);
        conn.subscribe(`/topic/2`, message => {
          var datas = JSON.parse(message.body);
          setNowOrder(datas);
          //console.log(datas);
          setIsOpen(true);
        });
      },
      onDisconnect: e => {
        console.log("disconnected");
      }

      // Helps during debugging, remove in production
      // debug: str => {
      //   console.log(new Date(), str);
      // }
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
        <Popup order={nowOrder} />
      </Modal>

      {/* {new URLSearchParams(location.search).get("keyword")} 검색 */}
      <div className="limiter">
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table">
              <div className="row header">
                <div className="cell">주문자</div>
                <div className="cell">품목</div>
                <div className="cell">총 금액</div>
                <div className="cell">주문 시간</div>
                <div className="cell">주문 상태</div>
              </div>
              {Orders
                ? Array.from(Orders).map(x => {
                    return <OrderComp order={x} />;
                  })
                : null}
              <OrderComp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
