import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { db, auth } from "../firebase";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: "0,1rem",
      left: "0,1rem",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(1.8)",
      opacity: 0,
    },
  },
}));

const Message = (props) => {
  const { message, photoURL, uid, uid1 } = props.message;
  const { onlineStatus } = props;
  const [isOnline, setisOnline] = useState(false);

  useEffect(() => {
    onlineStatus.map((user) => {
      user === uid1 && setisOnline(true);
    });
    // return () => {
    //   cleanup
    // }
    console.log(uid1)
  }, [onlineStatus]);

  return isOnline ? (
    <div
      className={`message-container ${
        uid1 !== auth.currentUser.uid ? "sent" : "received"
      }`}
    >
      <div>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            sx={{ width: 35, height: 35 }}
            alt="Remy Sharp"
            src={photoURL}
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          />
        </StyledBadge>
      </div>
      <p style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>{message}</p>
    </div>
  ) : (
    <div
      className={`message-container ${
        uid1 !== auth.currentUser.uid ? "sent" : "received"
      }`}
    >
      <Avatar
        sx={{ width: 35, height: 35 }}
        alt="Remy Sharp"
        src={photoURL}
        style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
      />
      <p style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>{message}</p>
    </div>
  );
};

export default Message;
