top = $(shell git rev-parse --show-toplevel)
sub = $(shell pwd | sed 's/\/projects\/books\/formats\/.*//' )
key = $(shell basename "${sub}")

links=tmp/links.md
bound=tmp/bound.md
index=${sub}/index.md
output=${sub}/${key}.pdf
pandoc=pandoc-from-markdown-to-pdf

all: ${output}

.PHONY: clean
clean:
	rm -f "${links}" "${bound}" "${output}"

.PHONY: open
open:
	open "${output}"

${output}:
#	"${top}/bin/sync-topics-to-guides"
	"${top}/bin/parse-contents-file-to-markdown-links" "${index}" > "${links}"
	book-binder start.yml "${links}" "${bound}" "${sub}/topics"
	${pandoc} "${bound}" -o "${output}"
