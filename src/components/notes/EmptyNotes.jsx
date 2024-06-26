import { LightbulbOutlined as Lightbulb } from "@mui/icons-material";
import { Typography, Box, styled, Fade } from "@mui/material";
import { useState } from "react";

const Light = styled(Lightbulb)`
  font-size: 120px;
  color: #f5f5f5;
`;

const Text = styled(Typography)`
  color: #80868b;
  font-size: 22px;
`;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
`;

const EmptyNotes = () => {
  const [fade, setFade] = useState(true);

  return (
    <Container>
      <Fade in={fade} timeout={1000}>
        <Light onAnimationEnd={() => setFade(false)} />
      </Fade>
      <Text>Notes you add appear here</Text>
    </Container>
  );
};

export default EmptyNotes;
