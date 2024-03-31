import { useEffect, useState } from "react";
import { API_URL } from "../../config";

export default () => {
  let [mvs, setMvs] = useState([]);

  console.log(mvs);

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((res) => res.json())
      .then((mvsRs) => setMvs(mvsRs));
  }, []);
  return (
    <>
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
