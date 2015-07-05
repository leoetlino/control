# Initial setup

After cloning the repository, run `grunt install-hook` to set up the
git hooks. This is used to maintain the codebase quality.

---

# Workflow

- Changes are to be made and committed in the `master` branch.
  
- Avoid making huge, monolithic commits.
  
    As a reminder, commit messages should follow a set of good practices:
    
    - The first line should be shorter than 52 characters if possible,
      and the verb should be written at the present tense, not past.
      
    - The first line should not have a trailing dot.
    
    - If you include a longer message after the title, the second line
      should be left empty.
      
    - All lines apart from the first line should be shorter than 72
      characters if possible.
      
    - A good commit message should describe what the commit does.
    
    - Example:
    
        > Fix a critical bug in DumbService
        >
        > DumbService contained an infinite loop that caused the whole
        > app to not load. This commit fixes DumbService and by
        > extension, fixes the whole application.
      
    - Do NOT write:
    
        > Changed something.
        > I changed something but I'm not telling you what! Haha!
        > I also like to put everything on the same line, making my commit very very long and making tools such as
        > git diff work less optimally!
      
- The below two steps can be automated by running ./generate-production-build.

- Manual way:

  Once you have tested the code and made sure JSHint does not complain,
  you can merge your changes into the `prod` branch when you see fit.
  
  After merging your changes, run `grunt` *in the `prod` branch* to
  automatically generate a production build. Do NOT make any other
  changes on the `prod` branch until you have committed the production
  build.
  
- Tag the release with a version number that follows semver.
  Use `git tag` to see the latest tags.
  
- Push the changes back to the repository.
