require 'open-uri'
require 'net/http'
require 'uri'
require 'json'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


url = URI('http://www.foodsafetykorea.go.kr/portal/fooddanger/searchEggNonngList.do')

resp = Net::HTTP.get_response(url)
hash = JSON(resp.body)

hash.each do |eggProvider|
  ep = EggProvider.new({nagak_cd: eggProvider['nagak_cd'], sido_nm: eggProvider['sido_nm'], nongga_nm: eggProvider['nongga_nm'] })
  case eggProvider['sido_nm']
    when '서울'
      ep.local_cd = '01'
    when '부산'
      ep.local_cd = '02'
    when '대구'
      ep.local_cd = '03'
    when '인천'
      ep.local_cd = '04'
    when '광주'
      ep.local_cd = '05'
    when '대전'
      ep.local_cd = '06'
    when '울산'
      ep.local_cd = '07'
    when '경기'
      ep.local_cd = '08'
    when '강원'
      ep.local_cd = '09'
    when '충북'
      ep.local_cd = '10'
    when '충남'
      ep.local_cd = '11'
    when '전북'
      ep.local_cd = '12'
    when '전남'
      ep.local_cd = '13'
    when '경북'
      ep.local_cd = '14'
    when '경남'
      ep.local_cd = '15'
    when '제주'
      ep.local_cd = '16'
    when '세종'
      ep.local_cd = '17'
  end
  ep.save
end