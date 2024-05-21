import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "@store/slices/usersSlice";
import { Statuses } from "@store/statuses/statuses";
import { getErrorAuthMessage } from "@utils/errors";

import Loading from "@components/Loading/Loading";

import slyles from "./Users.module.scss";
const Users = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === Statuses.IDLE) {
      dispatch(getAllUsers());
    }
  }, [status, dispatch]);

  if (status === Statuses.LOADING) {
    return <Loading />;
  }

  if (status === Statuses.FAILED) {
    const friendlyMessage = getErrorAuthMessage(error);
    return <div className="text-danger">Error: {friendlyMessage}</div>;
  }

  return (
    <div className={slyles.container}>
      <h2>Users</h2>
      <ul>
        {Object.values(users).map((user) => (
          <li key={user.id}>
            <div>Name: {user.displayName}</div>
            <div>Email: {user.email}</div>
            <div>Role: {user.role}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
