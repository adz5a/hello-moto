#!/bin/bash

SESSION=$USER

# create session
# detaches it and name it
tmux -2 new-session -d -s $SESSION 

#### FIRST WINDOW : LOGS
# Setup first window and attaches it to session, name it "Logs"
tmux rename-window "logs"

# split horizontally and select first pane
tmux split-window -h
tmux select-pane -t 0

# start app dev mode
tmux send-keys "yarn start" C-m

#### SECOND WINDOW : EDITOR
# create windows and launch vim
tmux new-window -t $SESSION:1 -n "editor" 
tmux select-pane -t 0
tmux send-keys "vim src/" C-m

# select second window
tmux select-window -t $SESSION:1




## ATTACH SESSION
tmux -2 attach-session -t $SESSION
