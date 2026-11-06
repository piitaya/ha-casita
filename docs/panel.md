# Panel

Casita adds a "Casita" panel to the sidebar, for every user. Casita lives in his room there, you can talk to him and play with him. Its only setting is the assistant (the Assist pipeline) you talk to him with, saved for each user. By default it is the preferred assistant if it uses Casita, else the first assistant that does.

- The panel shows the Casita that is the conversation agent of that assistant. With another agent, it shows the first Casita entry and says he will talk without personality or emotions: he listens, thinks and speaks on his resting face. Only a pipeline error (Problem) or a lost connection (NoInternet) changes his face. The same goes for commands handled locally before reaching Casita.
- When no assistant uses Casita, a banner near the chat says so. Administrators get a "Create Casita assistant" button: it copies the preferred assistant (languages, speech-to-text, text-to-speech, wake word) with Casita as the conversation agent and "Prefer handling commands locally" off, then selects it. A link opens Settings > Voice assistants. Other users are asked to see an administrator.
- The weather and the time of day only change the light of the room, discreetly: warm sun, veiled clouds and fog, grey and cold rain, cold and clear snow, a brief flash now and then during a storm, an orange tint at dawn and dusk, and a darker room at night with a small warm glow near Casita. The weather entity is the one of the Casita options. Without one, it uses the only `weather` entity if there is just one.
- He reacts to every reply of his Casita entry, from any device: the panel shows the emotion and the words. Satellites whose assistant uses this Casita are followed by themselves: when one listens, thinks or answers, Casita does too.

With several Casita entries there is one panel.
