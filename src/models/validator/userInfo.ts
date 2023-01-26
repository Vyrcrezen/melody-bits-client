import { Equals, IsAlphanumeric, IsEmail, Length, Matches, Validate,  } from 'class-validator';

export class VblUserEmail {
    @IsEmail({}, {message: 'AC_000;Please provide a valid e-mail address'})
    user_email: string;

    constructor(email: string) {
        this.user_email = email;
    }
}

export class VblUserPassword {
    @Length(8, 64, { message: 'AC_001;Password must be between 8 and 64 characters long.' })
    user_password: string;

    constructor(password: string) {
        this.user_password = password;
    }
}

export class VblUsername {
    @Matches(/^(?!\p{Zs})(?!.*\p{Zs}$)[\p{L}\p{M}\p{Zs}\d]+$/u, { message: 'AC_003;Username must contain only letters and numbers' })
    @Length(3, 20, { message: 'AC_002;Username must be between 2 and 20 characters long.' })
    user_name: string;

    constructor(username: string) {
        this.user_name = username;
    }
}

export class VblUserBio {
    @Length(2, 1200, { message: 'AC_005;Bio text must be between 2 and 1200 characters long.' })
    user_bio: string;

    constructor(user_bio: string) {
        this.user_bio = user_bio;
    }
}
