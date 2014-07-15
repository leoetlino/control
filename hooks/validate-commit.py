#!/usr/bin/python

import sys, os, re
from subprocess import call

editor = 'nano'

message_file = sys.argv[1]

def check_format_rules(lineno, line):
    real_lineno = lineno + 1
    if lineno == 0:
        if len(line) > 50:
            return "Error %d: First line should be less than 50 characters " \
                    "in length." % (real_lineno,)
    #if lineno == 1:
    #    if line:
    #        return "Error %d: Second line (separating the summary and the body) should be empty." % (real_lineno,)
    if not line.startswith('#'):
        if len(line) > 72:
            return "Error %d: No line should be over 72 characters long." % (
                    real_lineno,)
    return False


while True:
    commit_msg = list()
    errors = list()
    with open(message_file) as commit_fd:
        for lineno, line in enumerate(commit_fd):
            stripped_line = line.strip()
            commit_msg.append(line)
            e = check_format_rules(lineno, stripped_line)
            if e:
                errors.append(e)
    if errors:
        with open(message_file, 'w') as commit_fd:
            for line in commit_msg:
                commit_fd.write(line)
            commit_fd.write('%s\n' % '# Please fix the following issue(s) before you continue:')
            for error in errors:
                commit_fd.write('#   %s\n' % (error,))
                commit_fd.write('#')
                commit_fd.write('\n')
                commit_fd.write('%s\n' % '# You will have to fix them before you can continue.')
                commit_fd.write('%s\n' % '# Alternatively, if you *really* want to continue, run git commit --no-verify.')
        re_edit = raw_input('STOP! There\'s been some issues with your commit message.\nPress y to edit it or n to cancel the commit. [y/n] ')
        if re_edit.lower() in ('n','no'):
            sys.exit(1)
        call('%s %s' % (editor, message_file), shell=True)
        continue
    break
