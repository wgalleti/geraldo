def choice_to_list(choice):
    return [dict(id=s[0], name=s[1].title()) for s in choice]
