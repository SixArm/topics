# Hint to work on this repo locally

Setup:

```sh
export ANTHROPIC_API_KEY=$(gpg-decrypt "$HOME/key/$USER/anthropic.com/api/guide.gpg)
cd ~/git/sixarm/topics 
```

Create topic:

```sh
export f="hello (agile change software engineering)"
~/git/sixarm/guide-book-tools/bin/mkdir-topic "$f"
~/git/sixarm/curl-claude/curl-claude-sonnet-for-guide-topic-page "$f" | pbcopy
```
