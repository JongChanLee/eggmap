class CreateEggProviders < ActiveRecord::Migration[5.1]
  def change
    create_table :egg_providers do |t|
      t.string :nagak_cd, null: false
      t.string :sido_nm,   null: false
      t.string :nongga_nm, null: false
      t.string :local_cd, null: false

      t.timestamps
    end
  end
end
