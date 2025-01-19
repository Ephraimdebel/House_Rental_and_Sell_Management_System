import "./notification.css";
let messageLength;
const dummyData = [
  {
    id: 1,
    date: "2021-09-01",
    time: "12:00",
    message: "This is a test message",
  },
  {
    id: 1,
    date: "2021-09-01",
    time: "12:05",
    message: "This is the second message from home",
  },
];

messageLength = dummyData.length;

function Notification() {
  return (
    <>
      <div id="notification-container">
        {dummyData.map((item, index) => (
          <div className="container" key={index}>
            <div className="notification">
              <div className="notification-date-time">
                {item.date} at {item.time}
              </div>
              <div className="notification-message">{item.message}</div>
            </div>
            <div className="seeDetail">See Detail</div>
          </div>
        ))}
      </div>
    </>
  );
}
export { messageLength };
export default Notification;
