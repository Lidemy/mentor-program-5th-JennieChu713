/* eslint-disable */
import React from "react";
import styled from "styled-components";

const AboutContainer = styled.section`
  width: 50%;
  margin: 2rem auto;
  border-top: 1px solid rgba(222, 176, 102, 0.5);
  border-bottom: 1px solid rgba(222, 176, 102, 0.5);
  border-radius: 5px;
`;
const AboutTitle = styled.h2``;
const AboutContent = styled.div`
  margin: 1.5rem 1rem;
`;

export default function AboutPage() {
  return (
    <AboutContainer>
      <AboutTitle>About Me</AboutTitle>
      <AboutContent>
        "I never had that many friends growing up so I used to be, OK with just
        me, just me, just me, just me... So I'll be fine, on the outside. I like
        to eat in school by myself, anyway, so I'll just stay, right here, right
        here, right here, right here... And I'll be fine, on the outside. So I
        just sit in my room after hours with the moon, to think of who knows my
        name. Would you cry if I died would you remember, my face."
      </AboutContent>
    </AboutContainer>
  );
}
