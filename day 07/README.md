Git
Git Explained Simply
What is Git?
Git is a version control system. It's like a history book for your project. It keeps
track of every change you make to your files over time. This lets you:
Go back to older versions: If you mess something up, you can easily undo
your changes and go back to a working version.
Collaborate with others: Multiple people can work on the same project
without overwriting each other's work.
Track changes: See exactly what was changed, when, and by whom.
Experiment safely: Create branches to try out new features without breaking
the main project.
Key Git Concepts:
Repository (Repo): This is like the main folder for your project that Git is
tracking. It contains all your project files and the history of changes. Think of it
as your project's "history book."
Working Directory: This is your local folder where you actually edit your
project files. It's where you make changes.
Staging Area (Index): This is a temporary area where you prepare changes
before committing them. You "stage" the files you want to include in your next
snapshot. Think of it like a "waiting room" for your changes.
Commit: A commit is a snapshot of your project at a specific point in time. It's
like saving a version of your essay. Each commit has a message describing
the changes you made. Commits are the entries in your project's "history
book."
Branch: A branch is like a separate timeline of development. You can branch
off from the main project to work on new features or fix bugs without affecting
Git 1
the main codebase. Think of it as creating a "new chapter" in your project's
book. The main branch is often called main or master .
Remote Repository: This is a repository hosted on a server (like GitHub,
GitLab, or Bitbucket). It's where you can share your code with others and
collaborate. It's like publishing your project's "history book" online for others
to see and contribute to.
Common Git Commands - Cheat Sheet
Here's a cheat sheet table with common Git commands. Keep this handy as you
learn!
Category Command Description Example
Basic Setup &
Info
git config --global
user.name "Your
Name"
Sets your name
for commits
(globally, once)
git config --global user.name "John
Doe"
git config --global
user.email
"email@example.com"
Sets your email
for commits
(globally, once)
git config --global user.email
"john@email.com"
git init
Initializes a new
Git repository in
the current
directory.
git init
git clone
<repository_url>
Downloads a
repository from a
remote URL to
your computer.
git clone
<https://github.com/user/repo.git >
git status
Shows the status
of your working
directory and
staging area.
git status
Working with
Changes
git add <filename> or
git add .
Stages changes
in a specific file
or all files for the
next commit.
git add index.html or git add .
git commit -m "Your
commit message"
Commits staged
changes with a
git commit -m "Fixing a bug in login
form"
Git 2
descriptive
message.
git diff
Shows the
difference
between your
working
directory and the
staging area.
git diff
git diff --staged
Shows the
difference
between the
staging area and
the last commit.
git diff --staged
git restore --staged
<filename>
Unstages a file,
removing it from
the staging area.
git restore --staged index.html
git restore <filename>
Discards
changes in your
working
directory for a
specific file.
git restore index.html
Viewing
History
git log
Shows the
commit history.
git log
git log --oneline
Shows a
condensed oneline commit
history.
git log --oneline
git show
<commit_hash>
Shows details of
a specific
commit.
git show a1b2c3d4
Branching git branch
Lists all branches
in your
repository
(current branch
highlighted).
git branch
git branch
<branch_name>
Creates a new
branch.
git branch feature-login
Git 3
git checkout
<branch_name>
Switches to a
different branch.
git checkout feature-login
git checkout -b
<new_branch_name>
Creates a new
branch and
switches to it
immediately.
git checkout -b develop
git merge
<branch_name>
Merges changes
from the
specified branch
into the current
branch.
git merge develop
git branch -d
<branch_name>
Deletes a branch
(after it's
merged).
git branch -d feature-login
Remote
Repositories
git remote add origin
<repository_url>
Adds a remote
repository
named "origin".
git remote add origin
<https://github.com/user/repo.git >
git remote -v
Shows
configured
remote
repositories.
git remote -v
git push origin
<branch_name>
Uploads local
commits to the
remote
repository (to
"origin" remote,
branch).
git push origin main
git pull origin
<branch_name>
Downloads
changes from
the remote
repository to
your local
branch.
git pull origin main
git fetch origin
Downloads
objects and refs
from another
repository
git fetch origin
Git 4
Explanation of some key commands:
git init : Use this command in your project folder to start using Git. It creates a
hidden .git folder that stores all the version history.
git clone : Use this to download a project that's already on a remote repository
(like GitHub).
git add : Tells Git to track changes you've made to files and prepare them for
the next commit. You need to "add" files to the staging area before you can
commit them.
git commit : Saves a snapshot of your staged changes. Always write a good
commit message to explain what you changed!
git status : A very useful command to see what's going on with your repository.
It tells you about changes you've made, files you've staged, and your current
branch.
git branch and git checkout : Essential for working with branches. Branching allows
you to work on features or fixes in isolation.
git push : Sends your local commits to a remote repository, making your
changes available to others or as a backup.
git pull : Gets the latest changes from the remote repository and merges them
into your local branch. Use this to stay up-to-date with the work of others.
Important Notes:
Commit Frequently: Commit your changes often, whenever you reach a
logical stopping point or complete a small task. Smaller, more frequent
commits are easier to understand and manage.
Write Good Commit Messages: Your commit messages should be clear and
concise, explaining why you made the changes, not just what you changed.
This helps you and others understand the history of the project later.
Use Branches for Features and Fixes: Don't work directly on the main branch
for new features or bug fixes. Create branches to keep your work organized
and prevent accidentally breaking the main codebase.
Interview Questions (Related to Git):
Git 5
1. What is Git and why is it important in software development? (Hint: Version
control, collaboration, tracking changes)
2. Explain the difference between git add , git commit , and git push . (Hint: Staging
area, local commit, remote repository)
3. What is a branch in Git and why are branches useful? (Hint: Parallel
development, feature isolation, bug fixes)
4. How do you merge changes from one branch to another in Git? (Hint: git
merge )
5. What is a remote repository and why do we use them? (Hint: Collaboration,
backup, sharing code)
6. Describe a typical Git workflow for developing a new feature. (Hint:
Branching, coding, committing, merging, pushing)
7. What is a merge conflict and how do you resolve it? (Hint: Conflicting
changes, manual resolution)
This is a starting point for Git. There's much more to learn, but these basics and
commands will get you going! Practice using these commands in a test repository
to get comfortable with Git.
