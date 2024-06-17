import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const Header = styled(AppBar)`
  z-index: 1201;
  background: #fff;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
`;

const Heading = styled(Typography)`
  color: #5f6368;
  font-size: 24px;
  margin-left: 25px;
`;

const HeaderBar = ({ open, handleDrawer }) => {
  const logo = "/notes.png";

  return (
    <Header open={open}>
      <Toolbar>
        <IconButton
          onClick={() => handleDrawer()}
          sx={{ marginRight: "20px" }}
          edge="start"
        >
          <Menu />
        </IconButton>
        <img src={logo} alt="logo" style={{ width: 50 }} />
        <Heading>Notes</Heading>
      </Toolbar>
    </Header>
  );
};

export default HeaderBar;
