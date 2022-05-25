import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
// import PersonIcon from "@mui/icons-material/Person";
// import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import UserForm from "../pages/UserForm";
import { User, UserResponse } from "../common/types";
import { postData } from "../features/user/userAPI";
import { toast } from "react-toastify";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  users: UserResponse[] | null;
  setUsers: React.Dispatch<React.SetStateAction<UserResponse[] | null>>;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, users, setUsers } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  const handleSubmit = (user: User | UserResponse) => {
    postData<User, UserResponse>("customers", user)
      .then((res) => {
        toast("user added successfully");
        onClose("gg");
        console.log("data", res);
        let newUser = { ...(res as UserResponse) };

        if (users != null) {
          let usersList: UserResponse[] | null = [newUser, ...users];

          setUsers(usersList);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });

    console.log("user", user);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add new user</DialogTitle>
      <UserForm onClose={onClose} handleSubmit={handleSubmit} />
    </Dialog>
  );
}

export interface SimpleDialogDemoProps {
  users: UserResponse[] | null;
  setUsers: React.Dispatch<React.SetStateAction<UserResponse[] | null>>;
}

export default function SimpleDialogDemo({
  users,
  setUsers,
}: SimpleDialogDemoProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
}
