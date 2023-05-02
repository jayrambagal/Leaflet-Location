### Leaflet-Location

#### live -> https://leafletplotcluster.onrender.com

### Snapshot
![Screenshot (336)](https://user-images.githubusercontent.com/94613732/235581195-9bddf47c-6a3b-4580-95bf-c2d0a611c74c.png)
![Screenshot (337)](https://user-images.githubusercontent.com/94613732/235581198-7e4996a1-f44e-412f-8a90-252ad7e3148c.png)
![Screenshot (338)](https://user-images.githubusercontent.com/94613732/235581205-94c02f0d-a93c-4ae3-8d51-b4075d8e8306.png)


![Screenshot (341)](https://user-images.githubusercontent.com/94613732/235585746-70e9e731-c9c2-47ea-a8a2-343ef33a05c2.png)

```
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import Switch from "react-switch";
import { HiOutlineX } from "react-icons/hi";
import InputField from "../UiComponents/InputField";
import PrimaryButton from "../UiComponents/PrimaryButton";
import PrimaryButton2 from "../UiComponents/PrimaryButton2";
import TertiaryButton from "../UiComponents/TertiaryButton";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edit({
  setLabel,
  setLink,
  label,
  userName,
  platform,
  link,
  open,
  setOpen,
  id,
  profile,
  setToggleStates,
  toggleStates,
  // highlighted,
  // handleHighlighted,
  idx,
}) {
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  const [label1, setLabel1] = React.useState(label);
  const [link1, setLink1] = React.useState(link);

  const handleClose = () => {
    setOpen(false);
  };
  async function handleSaveID() {
    try {
      const response = await fetch(
        "http://localhost:2610/record/record/updateLink",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: profile,
            id: id,
            label: label1,
            link: link1,
          }),
        }
      );
      if (response.ok) {
        // Update the label and link in the local state
        setToggleStates(!toggleStates);
        // Close the dialog box
        setOpen(false);
      } else {
        console.error("Failed to update link");
      }
    } catch (error) {
      console.error("Failed to update link:", error);
    }
  }
  const [highlighted, setHighlighted] = React.useState("");
  const handleHighlighted = (index, value) => {
    const newToggleStates = [...toggleStates];
    newToggleStates[index].highlighted = value;
    setToggleStates(newToggleStates);
    setHighlighted(value);
    saveToggleState1(index, value); // Save the toggle state to MongoDB
  };
  const saveToggleState1 = (index, value) => {
    fetch(
      `http://localhost:2610/record/toggleHighlight/${toggleStates[index]._id}`,
      {
        method: "PUT",
        body: JSON.stringify({ highlighted: value, name: profile }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
 
  return (
    <div>
      <Dialog
      PaperProps={{
        style: { borderRadius: 24 }   }}
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        maxWidth="100%"
        
      >
        <div className="w-[640px] h-[482px] p-[24px] bg-[#FFFFFF] rounded-md font-poppons">
          <div className="w-[592px] h-[28px] normal text-[20px] leading-[28px] text-[#1A1A1A] font-semibold flex justify-between ">
            <p className="w-[199px] h-[28px]">Connect {platform}</p>
            <HiOutlineX onClick={handleClose} />
          </div>

          <div className="w-[592px] h-[1px] mt-[24px] bg-[#F3F3F3] "></div>

          <div className="w-[592px] h-[358px] mt-[24px] flex-col justify-center items-center">
            {platform != "" ? (
              <div className=" h-[116px] gap-[12px] flex-col items-center">
                <img
                  style={{
                    display: "block",
                    margin: "0 auto",
                    width: "60px",
                    height: "60px",
                    borderRadius: "100%",
                  }}
                  src={require(`./logos/${platform}.png`)}
                  alt=""
                />
                <p className="font-semibold text-[18px] leading-[24px] ml-[250px]">
                  {platform}
                </p>
              </div>
            ) : (
              ""
            )}

            <div className="flex gap-2 mt-[24px] justify-between">
              <InputField
                label="Label"
                value={label1}
                onChange={(event) => setLabel1(event.target.value)}
                width="286px"
                height="40px"
                placeholder={platform}
              />
              <InputField
                label="Link"
                value={link1}
                onChange={(e) => setLink1(e.target.value)}
                width="286px"
                height="40px"
                placeholder="link"
              />
            </div>

            <div className="mt-[40px]  flex gap-3 ">
              <DialogContentText>Highlighted:</DialogContentText>

              <Switch
                checked={highlighted}
                onChange={(value) => handleHighlighted(idx, value)}
                onColor="#12A26E"
                offColor="#A7A7A7"
                checkedIcon={false}
                uncheckedIcon={false}
                width={44}
                height={24}
              />
            </div>

            <div className="mt-[34px] flex justify-end gap-1">
              <TertiaryButton width="89px" height="48px" onClick={handleClose} text="Cancel"></TertiaryButton>
              <PrimaryButton2 width="89px" height="48px" onClick={handleSaveID} text="Save"></PrimaryButton2>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

```
