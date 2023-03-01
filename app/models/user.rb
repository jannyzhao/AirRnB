# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  # has_secure_password takes care of is_password? and password() from SPIREG
  has_secure_password

  # ensure that user has a session_token before doing validation
  before_validation :ensure_session_token

  validates :username, 
    uniqueness: true,
    length: { in: 3..30 },
    format: { without: URI::MailTo::EMAIL_REGEXP, message: "cannot be an email" }

  validates :email,
    uniqueness: true,
    length: { in: 3..255 },
    format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :password,
    length: { in: 6..255 },
    allow_nil: true

  # validates :session_token,
  #   presence: true,
  #   uniqueness: true

  def self.find_by_credentials(credential, password)
    # if (URI::MailTo::EMAIL_REGEXP).match(credential)
    if credential.include?('@')
      user = User.find_by(email: credential)
    else
      user = User.find_by(username: credential)
    end

    return user if user && user.authenticate(password)
    # user && user.authenticate(password) ? user : false
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private
  def generate_unique_session_token
    token = SecureRandom::urlsafe_base64
    while User.exists?(session_token: token)
        token = SecureRandom::urlsafe_base64
    end
    token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end





