import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import {
  Card,
  Typography,
  CardContent,
  Divider,
  IconButton,
} from "@material-ui/core";
import "@fontsource/pacifico";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
  },
  title: {
    fontWeight: "bold",
    fontSize: 36,
  },

  pos: {
    marginBottom: 12,
  },
  pronounciation: {
    fontWeight: "normal",
    fontSize: 18,
    marginLeft: 12,
  },
  type: {
    fontWeight: "normal",
    fontStyle: "italic",
    fontSize: 18,
    marginTop: 6,
  },
  define: {
    fontSize: 20,

    "&:not(:first-child)": {
      marginTop: 5,
    },
  },
  example: {
    fontStyle: "italic",
  },
});

const Cards = (props) => {
  const data = props.response;
  const classes = useStyles();
  const bullet = <span className={classes.bullet}>•</span>;
  const [audio] = useState(new Audio(props.response.phonetics[0].audio));
  const handlePlayAudio = () => {
    audio.play();
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h5">
          {data.word}
          <span className={classes.pronounciation}>
            [
            {data.phonetics.map((obj, i) => {
              return ` ${obj.text}  `;
            })}
            ]
          </span>
          <IconButton onClick={handlePlayAudio}>
            <VolumeUpIcon />
          </IconButton>
        </Typography>
        <Divider />

        {data.meanings.map((obj, i) => {
          return (
            <>
              <Typography className={classes.type}>
                {obj.partOfSpeech}
              </Typography>
              {obj.definitions.map((x, y) => {
                return (
                  <>
                    <Typography className={classes.define}>
                      {bullet}
                      {x.definition}
                    </Typography>

                    <Typography className={classes.example}>
                      {x.example}
                    </Typography>
                  </>
                );
              })}
            </>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Cards;
