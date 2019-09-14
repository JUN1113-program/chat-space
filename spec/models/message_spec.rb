require "rails_helper"
describe Message do
  describe "Messageモデルのテストだよ" do
    context "保存できる場合だよ"  do
      it "メッセージだけで保存ができるよ" do
        message = build(:message, image:"")
        expect(message).to be_valid
      end
      it "画像だけで保存ができるよ" do
        message = build(:message, content:"")
        expect(message).to be_valid
      end

      it "メッセージと画像があれば保存ができるよ" do
        message = build(:message)
        expect(message).to be_valid
      end

    end

    context "保存できない場合だよ" do

      it "メッセージも画像もないと保存できないよ" do
        message = build(:message, image: "", content: "")
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end

      it "group_idがないと保存できないよ" do
        message = build(:message, group_id:"")
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
      it "user_idがないと保存できないよ" do
        message = build(:message, user_id:"")
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end

    end

  end

end