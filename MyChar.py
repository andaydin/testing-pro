from phBot import *
import QtBind
import time
import json
import os

# Plugin Metadata
pName = 'MyInfo'
pVersion = 'v1.0'
pUrl = 'https://github.com/yourusername/MyInfoPlugin'

# ______________________________ Initializing ______________________________ #

# Globals
character_data = None
last_update = time.time()

# Initializing GUI
gui = QtBind.init(__name__, pName)

_x = 6
_y = 9

# Create Labels for displaying character info
QtBind.createLabel(gui, '* Character Info', _x, _y)
_y += 20

# Character Name Label
lblCharName = QtBind.createLabel(gui, 'Character: ', _x, _y)
txtCharName = QtBind.createLabel(gui, 'N/A', _x + 70, _y)  # placeholder text
_y += 20

# EXP Label
lblExp = QtBind.createLabel(gui, 'EXP: ', _x, _y)
txtExp = QtBind.createLabel(gui, '0', _x + 50, _y)  # placeholder text
_y += 20

# Skill Points Label
lblSkillPoints = QtBind.createLabel(gui, 'Skill Points: ', _x, _y)
txtSkillPoints = QtBind.createLabel(gui, '0', _x + 100, _y)  # placeholder text
_y += 20

# ______________________________ Methods ______________________________ #

# Return folder path for storing plugin settings
def getPath():
    return get_config_dir() + pName + "\\"

# Return character configuration path (JSON)
def getConfig():
    return getPath() + character_data['server'] + "_" + character_data['name'] + ".json"

# Check if the character is ingame
def isJoined():
    global character_data
    character_data = get_character_data()

    # Debugging: Log the character data to check what's returned
    log(f"get_character_data(): {character_data}")

    if not (character_data and "name" in character_data and character_data["name"]):
        character_data = None
    return character_data

# Load default configuration
def loadDefaultConfig():
    QtBind.setText(gui, txtCharName, 'N/A')
    QtBind.setText(gui, txtExp, '0')
    QtBind.setText(gui, txtSkillPoints, '0')

# Save configuration (if required)
def save_configs():
    if isJoined():
        data = {
            "last_update": time.time()
        }
        with open(getConfig(), "w") as f:
            f.write(json.dumps(data, indent=4, sort_keys=True))

# Load configuration (if available)
def loadConfigs():
    loadDefaultConfig()
    if isJoined():
        if os.path.exists(getConfig()):
            with open(getConfig(), "r") as f:
                data = json.load(f)

# Update Character Info (Name, EXP, Skill Points)
def update_character_info():
    if isJoined():
        # Fetch Character Data
        char_name = character_data.get('name', 'Unknown')
        exp = character_data.get('current_exp', 0)
        max_exp = character_data.get('max_exp', 0)
        skill_points = character_data.get('sp', 0)

        # Debugging: Log the values before updating the GUI
        log(f"Updating Character Info - Name: {char_name}, EXP: {exp}/{max_exp}, Skill Points: {skill_points}")

        # Update the labels in the GUI
        QtBind.setText(gui, txtCharName, char_name)
        QtBind.setText(gui, txtExp, f"{exp}/{max_exp}")
        QtBind.setText(gui, txtSkillPoints, str(skill_points))

# ______________________________ Events ______________________________ #

# Called when the character joins the game
def joined_game():
    loadConfigs()
    update_character_info()

# Called in the game loop (every tick)
def on_game_tick():
    global last_update
    # Refresh the character info every 5 seconds
    if time.time() - last_update > 5:
        update_character_info()
        last_update = time.time()

# Plugin loaded successfully
log(f'Plugin: {pName} v{pVersion} successfully loaded')

# Check if folder exists for configuration
if not os.path.exists(getPath()):
    os.makedirs(getPath())
    log(f'Plugin: {pName} folder has been created')
