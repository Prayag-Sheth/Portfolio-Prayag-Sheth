import os
import subprocess
import sys

REPO = os.path.dirname(os.path.abspath(__file__))
MSG = """Add portfolio content, local images, and UI enhancements.

Personalize site from resume, fix image paths, add custom cursor,
Lenis smooth scroll, social icons, and generated cover art."""

ENV = os.environ.copy()
ENV["GIT_AUTHOR_NAME"] = "Prayag-Sheth"
ENV["GIT_AUTHOR_EMAIL"] = "prayagsheth94@gmail.com"
ENV["GIT_COMMITTER_NAME"] = "Prayag-Sheth"
ENV["GIT_COMMITTER_EMAIL"] = "prayagsheth94@gmail.com"


def run(*args: str) -> str:
    result = subprocess.run(
        args,
        cwd=REPO,
        env=ENV,
        check=True,
        capture_output=True,
        text=True,
    )
    return result.stdout.strip()


def main() -> None:
    run("git", "checkout", "dev")
    run("git", "add", "-A")
    tree = run("git", "write-tree")
    commit = run("git", "commit-tree", tree, "-m", MSG)
    run("git", "reset", "--hard", commit)
    run("git", "checkout", "main")
    run("git", "reset", "--hard", commit)

    body = run("git", "log", "-1", "--format=%B")
    if "Co-authored-by" in body:
        print("FAIL: co-author in commit", file=sys.stderr)
        sys.exit(1)

    print(run("git", "log", "-1", "--oneline"))
    print(run("git", "push", "-u", "origin", "dev"))
    print(run("git", "push", "-u", "origin", "main"))
    print("OK")


if __name__ == "__main__":
    main()
