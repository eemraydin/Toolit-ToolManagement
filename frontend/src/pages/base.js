import React from 'react'
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const BaseContainer = styled(Card)`
  min-height: 100%;`;

function Base({title, subtitle, buttons, content}) {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Typography variant="h2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1">
            {subtitle}
          </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            {buttons}
          </Grid>
      </Grid>
      <BaseContainer style={{ marginTop: 20 }}>
        <CardContent>
          {content}
        </CardContent>
      </BaseContainer>
    </>
  );
}

export default Base;

