class UserSerializer < ActiveModel::Serializer
  attributes :id, :user_name
  has_one :profile
  has_many :posts
end
