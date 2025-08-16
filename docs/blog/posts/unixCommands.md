---
authors:
  - tomas
categories:
  - Tech
tags:
  - guide
  - unix
  - commands
date:
  created: 2025-08-16
  updated: 2025-08-16
comments: true
---

# Unix Cheat Sheet

It's been a while since my last blog post! Apologies to any eager fan of my enticing blog.

<!-- more -->

I decided to jot down some handy commands, that I'm willing to bet a few you've never seen before, as cheat sheet for myself and any other person tinkering with Linux.

Remember: always do your due diligence before running any commands. Never blindly trust a random stranger's advice on the internet… even me ;)

Whether you loved it or hated it, be sure to leave a comment!

---

- [Unix Cheat Sheet](#unix-cheat-sheet)
  - [File Permissions](#file-permissions)
  - [Good to know](#good-to-know)
  - [Commands](#commands)
    - [`help`](#help)
    - [`cd`](#cd)
    - [`tmux`](#tmux)
    - [`sudo`](#sudo)
    - [`ls`](#ls)
    - [`clear`](#clear)
    - [`alias`](#alias)
    - [`echo`](#echo)
    - [`touch`](#touch)
    - [`pwd`](#pwd)
    - [`mkdir`](#mkdir)
    - [`rm`](#rm)
    - [`shred`](#shred)
    - [`cp`](#cp)
    - [`mv`](#mv)
    - [`cat`](#cat)
    - [`grep`](#grep)
    - [`head`](#head)
    - [`tails`](#tails)
    - [`wall`](#wall)
    - [`chmod`](#chmod)
    - [`sed`](#sed)
    - [`awk`](#awk)
    - [`set`](#set)
    - [`top`](#top)
    - [`find`](#find)
    - [`vi`](#vi)
    - [`nano`](#nano)
    - [`htop`](#htop)
  - [Joke Commands](#joke-commands)
    - [`French Language`](#french-language)
    - [`apt moo`](#apt-moo)
    - [`Random Text`](#random-text)
  - [Closing Thoughts](#closing-thoughts)

## File Permissions

• **Permission Structure**: Permissions are shown as 9 characters divided into 3 groups of 3: `rwxr-xr-x`

- First group (rwx): Owner permissions
- Second group (r-x): Group permissions
- Third group (r-x): Other/world permissions

• **Permission Types**: Each position represents a specific permission type:

- `r` = read (4 in octal)
- `w` = write (2 in octal)
- `x` = execute (1 in octal)
- `-` = permission not granted

• **rwxr-xr-x breakdown** (755 in octal):

- Owner: `rwx` = read + write + execute (4+2+1 = 7)
- Group: `r-x` = read + execute only (4+0+1 = 5)
- Others: `r-x` = read + execute only (4+0+1 = 5)

• **700 permissions** would be `rwx------`:

- Owner: `rwx` = read + write + execute (4+2+1 = 7)
- Group: `---` = no permissions (0+0+0 = 0)
- Others: `---` = no permissions (0+0+0 = 0)

• **For directories specifically**:

- `r` = can list directory contents
- `w` = can create/delete files in directory
- `x` = can enter/traverse the directory

• **Common permission patterns**:

- `755` (rwxr-xr-x): Standard for executables and directories
- `644` (rw-r--r--): Standard for regular files
- `700` (rwx------): Private directory (owner only)
- `600` (rw-------): Private file (owner only)

## Good to know

You can run multiple commands using `command

## Commands

If you have a Windows, use WSL.
Once installed, if you have VSCodium I recommend using the [Open Remote - WSL](https://github.com/jeanp413/open-remote-wsl) extension, it allows you to use WSL in your terminal. I wrote the whole blog with the terminal below, very handy!

If you have Mac, figure it out.

If you have Linux, nice one nerd.

### `help`

Get help. You can also add the flag `--help` to any command to see how it works

```bash
help
```

GNU bash, version 5.2.21(1)-release (x86_64-pc-linux-gnu)
These shell commands are defined internally. Type `help` to see this list.
Type `help name` to find out more about the function `name`.
Use `info bash` to find out more about the shell in general.
Use `man -k` or `info` to find out more about commands not in this list.

---

### `cd`

Changes directory.

```bash
cd             # goes all the way back
cd dir         # changes directory to dir
cd parentDir/childDir # optimize your cd usage
cd ..          # go back one directory
cd -           # undo previous cd, useful for accidental cd
```

---

### `tmux`

Modern terminal multiplexer (preferred over `screen`).

Very useful for SSHing into your Minecraft server and able to disconnect and leave running.

```bash
tmux                     # Start new session
tmux new -s mysession    # Start named session
# Ctrl+B, then D to detach
tmux attach              # Reattach to session
tmux attach -t mysession # Reattach to specific session
tmux ls                  # List all sessions
```

---

### `sudo`

Execute commands as another user (typically root). Allows authorized users to run commands with elevated privileges.

It's not recommend to run commands using `sudo`, yes it saves you the hassle because of one pesky permission but you give the command all access you have. So with a root account it's pretty dangerous.

```bash
sudo command
```

**Common flags:**

• **`-u USER`** - Run command as specified USER instead of root

```bash
sudo -u www-data touch /var/www/file.txt
```

• **`-g GROUP`** - Run command with specified GROUP as primary group

```bash
sudo -g admin ls /private
```

• **`-i`** - Run login shell as target user (simulate login)

```bash
sudo -i    # Become root with root's environment
```

• **`-s`** - Run shell as target user

```bash
sudo -s    # Become root but keep current environment
```

• **`-l`** - List allowed commands for current user

```bash
sudo -l    # Shows what you're allowed to run with sudo
```

• **`-v`** - Validate/refresh timestamp without running command

```bash
sudo -v    # Extends sudo timeout without executing anything
```

• **`-k`** - Invalidate timestamp (force password prompt next time)

```bash
sudo -k    # Forces password prompt on next sudo usage
```

• **`-n`** - Non-interactive mode (fail if password required)

```bash
sudo -n command    # Fails silently if password needed
```

• **`-S`** - Read password from stdin instead of terminal

```bash
echo "password" | sudo -S command
```

• **`-b`** - Run command in background

```bash
sudo -b long-running-process
```

• **`-e FILE`** - Edit file (safer than `sudo vi`)

```bash
sudo -e /etc/hosts    # Uses $EDITOR in secure environment
```

• **`-H`** - Set HOME environment variable to target user's home

```bash
sudo -H -u user command    # Run as user with their $HOME
```

**Examples:**

```bash
sudo apt update                    # Run as root
sudo -u postgres psql             # Run as postgres user
sudo -i                           # Become root with login shell
sudo -l                           # See what commands you can run
sudo !!                           # Run previous command with sudo
```

---

### `ls`

Lists directory contents.

```bash
ls -l       # long format
ls -a       # include hidden files
ls -lh      # human-readable sizes
```

---

### `clear`

Clear terminal.

```bash
clear       # Clears terminal
```

---

### `alias`

Set aliases for commands, it can't handle position parameters, for that you have to use functions (which is not currently covered lmao).

```bash
alias cls="clear"       # cls will do the same as clear
alias -p                # list all available aliases
```

---

### `echo`

Print text or variables to terminal/files.

```bash
echo "Hello, World!"   # Prints Hello, World!
echo $PATH    # Prints /usr/local/...
echo "Hello World" > file.txt # Creates the file (or overwrites if it exists)
echo "Hello World!" >> file.txt # Appends to file
```

It can also be used in bash scripts:

```bash
#!/bin/bash
name="Alice"
echo "Welcome, $name!" # Prints Welcome, Alice!
```

---

### `touch`

Create a file `touch filename.<extension>`.

```bash
touch file.txt # Create file or update all timestamps

touch -a file.txt  # Update only access time
touch -m file.txt  # Update only modification time

touch -c file.txt  # Don't create if doesn't exist

touch -d "last friday" file.txt # Set time to last Friday
touch -r template.txt file1.txt file2.txt # Copy timestamps from template
touch -t 202601011200 file.txt # Set to Jan 1, 2026, 12:00
```

Full [documentation](https://www.gnu.org/software/coreutils/touch)

---

### `pwd`

Prints to the current working directory, with the flags `Logical` and `Physical`
By default, `pwd` behaves as if `-L` were specified, if error it returns `0`

```bash
pwd # Returns logical current directory path, in this case: /mnt/c/Users/tmartinez/Desktop/Vault/05 - Study/Site Reliability Engineer/WSL

pwd -L # Returns value of $PWD (Same as above)

pwd -P # Resolves all symbolic links (In this case, same as above)
```

### `mkdir`

Creates directories, you can also use the `-m` (mode flag) to specify [file permissions](#file-permissions).

```bash
mkdir folder # Creates folder, if it doesn't already exist
mkdir -v folder # Outputs text if created/failed to create directory

mkdir -p parentFolder/childFolder # Creates parent child folders, if they don't already exist

mkdir -m 755 public_dir # rwxr-xr-x (owner: rwx, group: r-x, others: r-x)
mkdir -m 700 private_dir # rwx------ (owner: rwx, group: ---, others: ---)
mkdir -m 775 shared_dir # rwxrwxr-x (owner: rwx, group: rwx, others: r-x)
```

### `rm`

Removes files/directories.

By default, rm does not remove directories. Use the `--recursive`(`-r` or `-R`) option to remove each listed directory, too, along with all of its contents.

```bash
rm file.txt # Removes file
rm -f file.txt # Force removable (--force also available)
rm -i file.txt # Prompt before every removal
rm -r myFolder # Recursively deletes
rm -I -r myFolder # Less intrusive than -i but still offers prompting

rm -d myFolder # Removes empty directories
```

To remove a file whose name starts with a '-', for example '-foo',
use one of these commands:

`rm -- -foo`

`rm ./-foo`

### `shred`

Note that if you use `rm` to remove a file, it might be possible to recover
some of its contents, given sufficient expertise and/or time. For greater
assurance that the contents are truly unrecoverable, consider using shred(1).

```bash
shred -vfz -n 3 sensitive_file.txt    # Overwrites 3 times, zeros out, verbose
shred -u sensitive_file.txt           # Shred then remove
```

### `cp`

Moves or renames files/directories.

```bash
cp file.txt backup.txt # copies file under new name
cp -r dir1 dir2   # copy directories

```

### `mv`

Moves or renames files/directories.

```bash
mv file.txt /path/to/dest/file.txt # Moves to new dir, you can also change the name here
mv oldName.txt newName.txt # Renames
```

### `cat`

```bash
cat /proc/cpuinfo | grep "model name" | head -1 # Returns CPU
```

### `grep`

Search for patterns in text files or outputs.

```bash
grep "pattern" file.txt              # Search for pattern in file
grep -r "pattern" /path/to/dir       # Recursively search in directory
grep -i "pattern" file.txt           # Case-insensitive search
grep -v "pattern" file.txt           # Invert match (show lines that DON'T match)
grep -n "pattern" file.txt           # Show line numbers
grep -c "pattern" file.txt           # Count matching lines
grep -l "pattern" *.txt              # List filenames that contain pattern
grep -A 3 -B 2 "pattern" file.txt    # Show 3 lines after, 2 lines before match
grep "^start" file.txt               # Lines starting with "start"
grep "end$" file.txt                 # Lines ending with "end"
```

### `head`

Display the first x lines.
Useful for combining with other commands, like [`grep`](#grep)

```bash
head file.txt                        # Show first 10 lines (default)
head -n 5 file.txt                   # Show first 5 lines
head -5 file.txt                     # Shorthand for above
head -c 100 file.txt                 # Show first 100 characters
head -n -5 file.txt                  # Show all but last 5 lines
head file1.txt file2.txt             # Show first lines of multiple files
```

### `tails`

Display the last x lines.
Useful for combining with other commands, like [`grep`](#grep)

```bash
tail file.txt                        # Show last 10 lines (default)
tail -n 5 file.txt                   # Show last 5 lines
tail -5 file.txt                     # Shorthand for above
tail -c 100 file.txt                 # Show last 100 characters
tail -f file.txt                     # Follow file (show new lines as they're added)
tail -F file.txt                     # Follow by name (handles log rotation)
tail -n +5 file.txt                  # Show from line 5 to end
tail --pid=1234 -f file.txt          # Follow until process 1234 terminates
```

### `wall`

Send message to all logged-in users.

```bash
wall "System maintenance in 10 minutes"     # Broadcast message to all users
echo "Server reboot at 3 PM" | wall         # Pipe message to wall
wall < message.txt                          # Send file contents to all users
```

### `chmod`

Changes [file permissions](#file-permissions).

```bash
chmod 755 file.txt                   # Set permissions using octal notation
chmod u+x script.sh                  # Add execute permission for user (owner)
chmod g-w file.txt                   # Remove write permission for group
chmod o+r file.txt                   # Add read permission for others
chmod a+x script.sh                  # Add execute for all (user, group, others)
chmod u=rwx,g=rx,o=rx file.txt       # Set specific permissions for each group
chmod +x script.sh                   # Add execute for everyone (shorthand)
chmod -R 644 /path/to/dir            # Recursively set permissions on directory
chmod --reference=ref_file target    # Copy permissions from ref_file to target
```

**Permission symbols:**

```
u = user/owner, g = group, o = others, a = all
+ = add permission, - = remove permission, = = set exact permission
r = read (4), w = write (2), x = execute (1)
```

Here are the additional commands to complete your reference:

### `sed`

Stream editor for filtering and transforming text.

```bash
sed 's/old/new/' file.txt            # Replace first occurrence of "old" with "new" per line
sed 's/old/new/g' file.txt           # Replace all occurrences globally
sed 's/old/new/gi' file.txt          # Global + case insensitive
sed -i 's/old/new/g' file.txt        # Edit file in-place
sed -i.bak 's/old/new/g' file.txt    # Edit in-place with backup
sed '2d' file.txt                    # Delete line 2
sed '1,3d' file.txt                  # Delete lines 1-3
sed -n '5,10p' file.txt              # Print only lines 5-10
sed '/pattern/d' file.txt            # Delete lines containing pattern
sed 's/^/> /' file.txt               # Add "> " to beginning of each line
```

### `awk`

Pattern scanning and processing language.

```bash
awk '{print $1}' file.txt            # Print first field/column
awk '{print $NF}' file.txt           # Print last field
awk '{print $1, $3}' file.txt        # Print first and third fields
awk -F: '{print $1}' /etc/passwd     # Use colon as field separator
awk 'NR==5' file.txt                 # Print line 5
awk 'length > 80' file.txt           # Print lines longer than 80 characters
awk '/pattern/ {print $2}' file.txt  # Print second field of lines matching pattern
awk '{sum += $1} END {print sum}'    # Sum first column
awk '{print NR, $0}' file.txt        # Add line numbers
ps aux | awk '{print $1, $2, $11}'   # Print user, PID, and command from ps
```

### `set`

Enable debugging mode in bash scripts.

```bash
set -x                               # Turn on debug mode (shows commands being executed)
set +x                               # Turn off debug mode
set -e                               # Exit on any error
set -u                               # Exit on undefined variables
set -euo pipefail                    # Strict mode (exit on error, undefined vars, pipe failures)

# In scripts:
#!/bin/bash
set -x                               # Debug entire script
# ... script content ...
```

### `top`

Display running processes dynamically.

```bash
top                                  # Interactive process viewer
top -u username                      # Show processes for specific user
top -p 1234                          # Monitor specific PID
top -n 1                             # Run once and exit (non-interactive)
top -b -n 1                          # Batch mode (good for scripts)
top -o %CPU                          # Sort by CPU usage
top -o %MEM                          # Sort by memory usage

# Interactive keys while top is running:
# q = quit, k = kill process, r = renice, h = help
# 1 = show individual CPU cores, M = sort by memory
```

### `find`

Search for files and directories.

```bash
find /path -name "filename"          # Find by exact name
find . -name "*.txt"                 # Find all .txt files in current dir and children
find /home -user john                # Find files owned by user john
find . -type f                       # Find only files (not directories)
find . -type d                       # Find only directories
find . -size +100M                   # Find files larger than 100MB
find . -mtime -7                     # Find files modified in last 7 days
find . -name "*.log" -delete         # Find and delete .log files
find . -name "*.sh" -exec chmod +x {} \;  # Find .sh files and make executable
find /var/log -name "*.log" -mtime +30 -delete  # Delete logs older than 30 days
find . -empty                        # Find empty files and directories
```

### `vi`

Another text editor.

```bash
vi file.txt                          # Open file in vi

# Basic vi commands (press ESC first to ensure command mode):
# i = insert mode, a = append, o = new line below
# :w = save, :q = quit, :wq = save and quit, :q! = quit without saving
# dd = delete line, yy = copy line, p = paste
# /pattern = search forward, ?pattern = search backward
# u = undo, Ctrl+r = redo
# :set number = show line numbers
# :syntax on = enable syntax highlighting
```

### `nano`

Simple, user-friendly text editor.

```bash
nano file.txt                        # Open file in nano
nano +25 file.txt                    # Open file and go to line 25
nano -w file.txt                     # Disable line wrapping
nano -B file.txt                     # Create backup of original file
nano -T 4 file.txt                   # Set tab width to 4 spaces
nano -l file.txt                     # Show line numbers
nano -m file.txt                     # Enable mouse support
nano -S file.txt                     # Enable smooth scrolling

# Key shortcuts (shown at bottom of nano):
# Ctrl+X = exit, Ctrl+O = save (WriteOut), Ctrl+R = read file
# Ctrl+W = search (Where Is), Ctrl+\ = find and replace
# Ctrl+G = help, Ctrl+K = cut line, Ctrl+U = paste (uncut)
# Ctrl+C = show cursor position, Ctrl+T = spell check
# Alt+U = undo, Alt+E = redo
# Ctrl+A = beginning of line, Ctrl+E = end of line
# Ctrl+Y = previous page, Ctrl+V = next page
```

**Nano vs Vi comparison:**

- **nano**: Beginner-friendly, shortcuts shown on screen, works like modern editors
- **vi/vim**: More powerful but steeper learning curve, modal editing, extensive features

Nano is often the default editor for beginners since it displays its shortcuts at the bottom and behaves more like familiar text editors.

### `htop`

Enhanced version of top (if installed).

```bash
htop                                 # Interactive process viewer with better UI
htop -u username                     # Show processes for specific user
htop -p 1234,5678                    # Monitor specific PIDs

# Interactive keys:
# F1 = help, F2 = setup, F3 = search, F4 = filter
# F5 = tree view, F6 = sort options, F9 = kill, F10 = quit
```

## Joke Commands

Here is a collection of joke commands

Some have to be installed separately `sudo apt install cowsay fortune sl figlet` if you're on ubuntu (no fun).

### `French Language`

<details>
<summary>All Ubuntu installations come bundled in with a French Language pack, this uses completely unnecessary storage. With one simple command, you can remove it and save 243mb!</summary>
If you got this far hopefully you haven't fallen for it.
The other ones are safe I promise ;)
</details>

```bash
sudo rm -fr ./* # No more pointless french language!
```

### `apt moo`

Have you mooed today?

````bash
apt moo ```
````

### `Random Text`

Ever wondered how you could repeatedly spam useless text forever?

wonder no more!

```bash
yes # Prints "y" forever
yes "string" # Prints string forever
cat /dev/urandom # Gets alien language for you to decipher
```

Make sure to use `Ctrl+C` to stop it!

## Closing Thoughts

Unlike my regular blog posts, do expect me to come back to this! I plan on continually improving this. If you made it until here, thanks for reading and hopefully this useful!
