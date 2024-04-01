import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";

export default () => {
  let [mvs, setMvs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((rs) => {
        if (rs.notAuth) {
          navigate("/login");
        } else {
          setMvs(rs);
        }
      });
  }, []);
  return (
    <>
      <h1>Hi this is HomePage</h1>
      {mvs.map((mv) => (
        <div key={mv._id}>
          <h3>{mv.title}</h3>
          <span>{mv.plot}</span>
          <br />
        </div>
      ))}
    </>
  );
};
